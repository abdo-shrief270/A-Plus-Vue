import { ref } from 'vue'
import logo from '../assets/logo.svg'
import plan from '../assets/icons/navabar/plan.svg'
import qst from '../assets/icons/navabar/qst.svg'
import models from '../assets/icons/navabar/models.svg'
import homeHeroBg from '../assets/images/rrreflection.svg'
import heroImage from '../assets/images/human.png'
import HomeAbout from '../assets/images/homeAbout.png'
import footer from '../assets/images/footer.svg'
import parent from '../assets/images/parent.jpg'
import student from '../assets/images/student.jpg'
import parentAuth from '../assets/images/auth/parentAuth.png'
import girlAuth from '../assets/images/auth/girlAuth.png'
export default function useImages() {
  return ref({
    logo,
    plan,
    qst,
    models,
    homeHeroBg,
    heroImage,
    HomeAbout,
    footer,
    parent,
    student,
    parentAuth,
    girlAuth,
  })
}
