<script lang="ts">
    import type { CactusItem, Alert as AlertType } from '../types'
    import { redirect } from '@roxi/routify'
    import { cactuses } from '../store'
    import CactusForm from '../components/CactusForm.svelte'
    import Alert from '../components/Alert.svelte'

    export let id: string = ''

    let alert: AlertType = {
        show: false,
        message: '',
        type: '',
    }

    const cactus: CactusItem = $cactuses.find(
        (item: CactusItem) => item.id === id
    )

    const modifyCactus = async (e: CustomEvent): Promise<void> => {
        const cactus: CactusItem = e.detail
        try {
            const response = await fetch(process.env.CACTUS_BACKEND_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cactus),
            })

            const data = await response.json()

            if (!response.ok) {
                throw data.message
            }

            $redirect('/')
        } catch (error) {
            const err = {
                show: true,
                message: error,
                type: 'danger',
            }

            alert = err
        }
    }
</script>

<svelte:head>
    <title>Cactus - {cactus.name}</title>
</svelte:head>

<main>
    <div class="container">
        <h1>Edit cactus {cactus.name}</h1>

        {#if alert.show}
            <Alert message={alert.message} type={alert.type} />
        {/if}

        <CactusForm {cactus} on:formSubmit={modifyCactus} />
    </div>
</main>
