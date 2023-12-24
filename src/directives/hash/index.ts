import { Directive } from 'vue';

export const hash: Directive = {
  beforeMount(el: Element) {
    const src: string | null = el.getAttribute('src');

    if (src) {
      el.setAttribute('src', `${src}?__static_hash__`);
    }
  }
}
