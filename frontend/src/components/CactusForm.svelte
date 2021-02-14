<script lang="ts">
    import type { CactusItem } from '../types'
    import { createEventDispatcher } from 'svelte'
    import { url } from '@roxi/routify'

    export let cactus: CactusItem = {
        name: '',
        latinName: '',
        thornsNumber: 1,
        flowerpotSize: 'small',
    }
    export let button: string = 'Update cactus'

    const dispatch = createEventDispatcher()

    const handleSubmit = (e: Event): void => {
        e.preventDefault()
        dispatch('formSubmit', cactus)
    }
</script>

<form on:submit={handleSubmit}>
    <div class="row">
        <div class="col-lg-6">
            <div class="mb-3">
                <label class="form-label" for="name">Name</label>
                <input
                    placeholder="Name"
                    type="text"
                    class="form-control"
                    id="name"
                    bind:value={cactus.name}
                    required />
            </div>
        </div>
        <div class="col-lg-6">
            <div class="mb-3">
                <label class="form-label" for="latinName">Latin name</label>
                <input
                    placeholder="Latin name"
                    type="text"
                    class="form-control"
                    id="latinName"
                    bind:value={cactus.latinName}
                    required />
            </div>
        </div>
        <div class="col-lg-6">
            <div class="mb-3">
                <label class="form-label" for="flowerpotSize"
                    >Flowerpot size</label>
                <select
                    bind:value={cactus.flowerpotSize}
                    class="form-select"
                    id="flowerpotSize"
                    required>
                    <option value="small">Small</option>
                    <option value="middle">Middle</option>
                    <option value="big">Big</option>
                </select>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="mb-3">
                <label class="form-label" for="thornsNumber">Thorns</label>
                <input
                    placeholder="Thorns"
                    type="number"
                    class="form-control"
                    id="thornsNumber"
                    bind:value={cactus.thornsNumber}
                    min="1"
                    required />
            </div>
        </div>
    </div>
    <div class="d-flex align-items-center justify-content-between">
        <a class="btn btn-secondary" href={$url('/')}>Back</a>
        <button type="submit" class="btn btn-primary">{button}</button>
    </div>
</form>
