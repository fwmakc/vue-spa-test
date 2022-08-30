import {ref, computed} from 'vue';

export function useSort(entries) {
  const sortOrder = ref('default');
  const sortOptions = ref([
    {
      value: 'default',
      title: 'По номерам',
      by: 'id',
      order: 'asc'
    },
    {
      value: 'reverse',
      title: 'В обратном порядке',
      by: 'id',
      order: 'desc'
    },
    {
      value: 'asc',
      title: 'По названию',
      by: 'title',
      order: 'asc'
    },
    {
      value: 'desc',
      title: 'По названию в обратном порядке',
      by: 'title',
      order: 'desc'
    }
  ]);

  const sortOrderComputed = computed(() => {
    const find = sortOptions.value.find(
      item => item.value === sortOrder.value
    );
    const array = [...entries.value].sort(
      (post1, post2) =>
        typeof(post1[find.by]) === 'number'
        && typeof(post2[find.by]) === 'number'
          ? post1[find.by] > post2[find.by]
          : String(post1[find.by])?.localeCompare(String(post2[find.by]))
    );
    if (find.order === 'desc') {
      array.reverse();
    }
    return array;
  });
  const sortChange = (value) => { sortOrder.value = value }

  return {
    sortOrder,
    sortOptions,
    sortOrderComputed,
    sortChange
  }
}
