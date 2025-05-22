import { ref } from 'vue';
import createAxiosInstance from '@/services/api/instance';
import { showToast } from '@/helpers/toast.helper';

const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

export class useApi {
  constructor(resource, api_version = 'v3') {
    this.baseUrl = `${import.meta.env.VITE_API_BASE_URL}/${api_version}/${resource}`;
    this.loading = ref(false);
    this.creating = ref(false);
    this.editing = ref(false);
    this.deleting = ref(false);
    this.error = ref(null);
    this.records = ref([]);
    this.record = ref({});
    this.meta = ref({
      current_page: 1,
      total: 0,
      last_page: 1,
      per_page: 15
    });

    this.axiosInstance = new createAxiosInstance();

    this.get = this.get.bind(this);
    this.getCached = this.getCached.bind(this);
    this.show = this.show.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }

  getCacheKey(params) {
    return `cache_${this.baseUrl}_${JSON.stringify(params)}`;
  }

  async get(params) {
    this.loading.value = true;
    this.error.value = null;
    try {
      const { data } = await this.axiosInstance.get(this.baseUrl, { params });
      this.records.value = data?.data?.records || [];
      this.meta.value = data?.data?.meta || {};
      this.lastCacheParams = params;
      return data?.data || [];
    } catch (err) {
      this.error.value = err;
      throw err;
    } finally {
      this.loading.value = false;
    }
  }

  async getCached(params) {
    const cacheKey = this.getCacheKey(params);
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      const parsedCache = JSON.parse(cachedData);
      if (Date.now() - parsedCache.timestamp < CACHE_DURATION) {
        this.records.value = parsedCache.data.records || [];
        this.meta.value = parsedCache.data.meta || {};
        return parsedCache.data;
      } else {
        localStorage.removeItem(cacheKey); // Clear expired cache
      }
    }

    const freshData = await this.get(params);
    localStorage.setItem(
      cacheKey,
      JSON.stringify({ timestamp: Date.now(), data: freshData })
    );
    return freshData;
  }

  async show(id, params) {
    this.loading.value = true;
    this.error.value = null;
    try {
      const { data } = await this.axiosInstance.get(`${this.baseUrl}/${id}`, {
        ...params
      });
      return data;
    } catch (err) {
      this.error.value = err;
      throw err;
    } finally {
      this.loading.value = false;
    }
  }

  async create(payload, cacheParams = null) {
    this.creating.value = true;
    this.error.value = null;
    try {
      const { data } = await this.axiosInstance.post(
        `${this.baseUrl}/create`,
        payload
      );
      this.error.value = { success: true };
      showToast('success', data?.message, 'success');

      if (cacheParams) {
        const cacheKey = this.getCacheKey(cacheParams);
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          parsed.data.records.unshift(data.data);
          parsed.data.meta.total += 1;
          localStorage.setItem(cacheKey, JSON.stringify(parsed));
        }
      }

      this.records.value.unshift(data.data); // Add to top of list in UI

      return data;
    } catch (err) {
      this.error.value = err;
      throw err;
    } finally {
      this.creating.value = false;
    }
  }

  async update(id, payload, cacheParams = null) {
    this.editing.value = true;
    this.error.value = null;
    try {
      const { data } = await this.axiosInstance.post(
        `${this.baseUrl}/update/${id}`,
        payload
      );
      this.error.value = { success: true };
      showToast('success', data?.message, 'success');

      const updatedItem = data?.data;
      const usedParams = cacheParams || this.lastCacheParams;

      if (usedParams) {
        const cacheKey = this.getCacheKey(usedParams);
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          const index = parsed.data.records.findIndex(record => record.id === id);
          if (index !== -1) {
            parsed.data.records[index] = {
              ...parsed.data.records[index],
              ...updatedItem
            };
            localStorage.setItem(cacheKey, JSON.stringify(parsed));
          }
        }
      }

      const index = this.records.value.findIndex(record => record.id === id);
      if (index !== -1) {
        this.records.value[index] = {
          ...this.records.value[index],
          ...updatedItem
        };
      }

      return data;
    } catch (err) {
      this.error.value = err;
      throw err;
    } finally {
      this.editing.value = false;
    }
  }

  async changeStatus(id, payload) {
    this.editing.value = true;
    this.error.value = null;
    try {
      const { data } = await this.axiosInstance.post(
        `${this.baseUrl}/change-status/${id}`,
        payload
      );
      this.error.value = { success: true };
      showToast('success', data?.message, 'success');
      return data;
    } catch (err) {
      this.error.value = err;
      throw err;
    } finally {
      this.editing.value = false;
    }
  }

  async remove(id, cacheParams = null) {
    this.deleting.value = true;
    this.error.value = null;
    try {
      const { data } = await this.axiosInstance.post(
        `${this.baseUrl}/delete/${id}`
      );
      this.error.value = { success: true };
      showToast('success', data?.message, 'success');

      // ✅ Remove from reactive UI
      this.records.value = this.records.value.filter(record => record.id !== id);

      // ✅ Update localStorage cache if exists
      const usedParams = cacheParams || this.lastCacheParams;
      if (usedParams) {
        const cacheKey = this.getCacheKey(usedParams);
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          parsed.data.records = parsed.data.records.filter(record => record.id !== id);
          parsed.data.meta.total = Math.max(0, parsed.data.meta.total - 1);
          localStorage.setItem(cacheKey, JSON.stringify(parsed));
        }
      }

      return data;
    } catch (err) {
      this.error.value = err;
      throw err;
    } finally {
      this.deleting.value = false;
    }
  }
}
