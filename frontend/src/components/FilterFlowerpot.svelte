<script lang="ts">
    import type { CactusItem } from '../types'
    import { createEventDispatcher } from 'svelte'

    export let cactuses: Array<CactusItem>

    const dispatch = createEventDispatcher()
    let selectedValue: string = ''

    const handleFlowerpotFilter = (): void => {
        const filteredValues: Array<CactusItem> = cactuses.filter(
            (item: CactusItem) => {
                if (!selectedValue) {
                    return true
                }

                return item.flowerpotSize === selectedValue
            }
        )

        dispatch('filterFlowerpot', filteredValues)
    }
</script>

<div class="mb-3">
    <label for="filterFlowerpot" class="form-label"
        >Filter by flowerpot size</label>
    <!-- svelte-ignore a11y-no-onchange -->
    <select
        class="form-select"
        id="filterFlowerpot"
        bind:value={selectedValue}
        on:change={handleFlowerpotFilter}>
        <option value="" selected>Don't apply the filter</option>
        <option value="small">Small</option>
        <option value="middle">Middle</option>
        <option value="big">Big</option>
    </select>
</div>
