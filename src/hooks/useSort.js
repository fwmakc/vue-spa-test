import {ref, computed} from 'vue';

export default function useSort(entries) {
  const sortOrder = ref('asc');
  
  const sortOrderComputed = computed(() => {
    const array = [...entries].sort(
      (post1, post2) => {
        return post1.title?.localeCompare(post2.title)
      });
    if (sortOrder.value !== 'asc') {
      array.reverse();
    }
    return array;
  });
  
  return {
    sortOrder,
    sortOrderComputed
  }
}
