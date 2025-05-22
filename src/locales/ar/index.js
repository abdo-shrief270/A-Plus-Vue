import global from './global';
import auth from './auth.json';
import contacts from './contacts.json';
import tags from './tags.json';
import errors from './errors.json';
import campaigns from './campaigns.json';
import conversations from './conversation.json';
import settings from './settings.json';
import sms from './sms.json';
import notifications from './notifications.json';
export default {
  ...global,
  ...auth,
  ...contacts,
  ...tags,
  ...errors,
  ...campaigns,
  ...conversations,
  ...settings,
  ...sms,
  ...notifications
};
