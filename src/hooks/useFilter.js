import {ref, computed} from 'vue';

export function useFilter(sortedEntries) {
  const filter = ref('');
  
  const filterComputed = computed(() => !filter.value ? sortedEntries.value : sortedEntries.value.filter(
    (entry) => entry.userId.toString() == filter.value
  ));
  const filterChange = (value) => { filter.value = value };

  return {
    filter,
    filterComputed,
    filterChange
  }
}
