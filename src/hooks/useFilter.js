import {ref, computed} from 'vue';

export default function useFilter(sortedEntries) {
  const filterSelected = ref('');
  
  const filterSelectedComputed = computed(() => {
    if (!filterSelected.value) {
      return sortedEntries;
    }
    return sortedEntries.filter(
      (entry) => {
        return entry.userId.toString() == filterSelected.value;
      }
    );
  });
  
  return {
    filterSelected,
    filterSelectedComputed
  }
}
