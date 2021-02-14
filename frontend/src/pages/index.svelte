<script lang="ts">
    import { url } from '@roxi/routify'
    import CactusesList from '../components/CactusesList.svelte'
</script>

<main>
    <div class="container">
        <div class="d-flex justify-content-between align-items-center">
            <h1>Cactuses</h1>

            <a class="btn btn-primary" href={$url('/create-cactus/')}
                >Create new cactus</a>
        </div>

        <CactusesList />
    </div>
</main>
