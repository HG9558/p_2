<template>
  <div>
    <BMenu :name-list="nameList" :keepalive="false"/>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import BMenu from '@/components/b-menu/index.vue';
import VenuesList from './venues-components/VenuesList.vue';
import GameList from './venues-components/GameList.vue';
import tagList from './venues-components/tagList.vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'VenueManagement',
  components: {
    BMenu,
    VenuesList,
    GameList,
    tagList
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const nameList = [
      {
        name: 'VenuesList',
        text: t('routes.site_page.plat_list'),
        components: VenuesList
      },
      {
        name: 'tagList',
        text: t('routes.site_page.tag_list'),
        components: tagList
      },
      {
        name: 'game-list',
        text: t('routes.site_page.game_list'),
        components: GameList
      }
    ];

    return {
      nameList,
      t
    };
  }
});
</script>
