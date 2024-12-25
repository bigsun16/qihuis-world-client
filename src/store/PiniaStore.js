import { defineStore } from 'pinia'
import { requestCategoryList } from '@/api/request'

export const useMenuBarStore = defineStore('menuList', {
  state: () => ({
    menuList: []
  }),
  actions: {
    async categoryList() {
      const result = await requestCategoryList()
      if (result.code === 200){
        this.menuList = result.data
      }
      // Object.assign(this.menuList, result)
    }
  }
})
