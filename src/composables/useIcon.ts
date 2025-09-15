import { h, VNode } from 'vue';
import * as heroicons from '@heroicons/vue/24/outline';

/**
 * useIcon composable
 * Returns an component of the icon based on the icon name.
 */
export const useIcon = () => {
  const getIcon = (iconName: string, className: string = ''): VNode => {

    // Generates an heroicon library component name like `IconHome` from `home`
    const pascalName = iconName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('') + 'Icon'

    let iconComponent

    const iconKey = pascalName as keyof typeof heroicons;
    iconComponent = heroicons[iconKey];

    if (!iconComponent) {
      console.error(`Icon component "${iconName}" not found in library.`);
      return h(heroicons['QuestionMarkCircleIcon']);
    }

    // Returns the icon component as a VNode
    return h(iconComponent, {
      class: className,
    });
  }

  return { getIcon }
}