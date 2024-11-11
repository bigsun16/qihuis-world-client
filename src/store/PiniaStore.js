import { defineStore } from 'pinia'
import { requestCategoryList } from '@/api/request'

export const useMenuBarStore = defineStore('menuList', {
  state: () => ({
    menuList: []
  }),
  actions: {
    async categoryList() {
      const result = await requestCategoryList()
      this.menuList = result
      // Object.assign(this.menuList, result)
    }
  }
})