<script lang="ts">
    import type { CactusItem } from '../types'
    import { createEventDispatcher } from 'svelte'

    export let cactuses: Array<CactusItem>

    const dispatch = createEventDispatcher()
    let searchValue: string = ''

    const handleFilterInput = (): void => {
        const filteredValues: Array<CactusItem> = cactuses.filter(
            (item: CactusItem) => {
                const name: string = item.name.toLowerCase()
                const key: string = searchValue.toLowerCase()

                if (!key) {
                    return true
                }

                return name.indexOf(key) !== -1
            }
        )

        dispatch('filterName', filteredValues)
    }
</script>

<div class="mb-3">
    <label class="form-label" for="filterName">Filter by name</label>
    <input
        type="text"
        id="filterName"
        class="form-control"
        bind:value={searchValue}
        on:input={handleFilterInput} />
</div>
