import { ValidationObserver, ValidationProvider, extend, localize } from "vee-validate"
// eslint-disable-next-line camelcase
import { alpha_dash, between, email, max, min, required } from "vee-validate/dist/rules"
import Vue from 'vue'
import fr from 'vee-validate/dist/locale/fr.json'

extend('alpha_dash', alpha_dash)
extend('between', between)
extend('email', email)
extend('min', min)
extend('max', max)
extend('required', required)
extend('url', value => {
  try {
    // eslint-disable-next-line no-new
    new URL(value)
    return true
  } catch {
    return false
  }
})

localize({ en: fr })
// localize({
//   fr: {
//     messages: {
//       required: 'Ce champ est requis.',
//       // between: (_, { min, max}) => `Ce champ doit être entre ${min} et ${max} caractères.`,
//     },
//     fields: {
//       url: {
//         url: "Cet URL n'est pas valide. N'oubliez pas le https:// au début.",
//       },
//       slug: {
//         alpha_dash: 'Le slug doit contenir uniquement des lettres minuscules, des chiffres et des tirets (- ou _). Les espaces et caractères spéciaux sont interdits.'
//       },
//     },
//   }
// })

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)