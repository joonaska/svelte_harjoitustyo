<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  const nayta = () => dispatch('nayta');
  const login = () => dispatch('login');
  const logout = () => dispatch('logout');

  export let logged;
  export let suosikit;
</script>

<div class=" navi">
  <!-- purkkaa purkkaa, jos navissa ei ole annettu suosikille arvoa muuttuu undefineks, jolloin voin sillä pelata sen pois näkyvistä-->
  {#if suosikit === undefined}
    <span class="valia">
      <button class="login" on:click={login} on:click={logout}>{logged}</button>
    </span>
    <!-- siispä jos on jotain muuta kuin undefined näyttää molemmat "kirjautuneena sisään...."-->
  {:else}
    <span class="valia">
      <button class="login" on:click={login} on:click={logout}>{logged}</button>
    </span>
    <span class="valia2">
      <button class="omat" on:click={nayta}>{suosikit}</button>
    </span>
  {/if}
</div>

<style>
  .navi {
    background: linear-gradient(
      to right,
      #0e0604 0%,
      #25a428 50%,
      #11c521 100%
    );

    padding: 2vh;
    margin-bottom: 3vh;
    justify-content: right;
    justify-items: right;
    display: flex;
    font-weight: bold;
    font-size: x-large;
  }
  .valia {
    margin-right: 1em;
  }
  .valia2 {
    margin-right: 1em;
  }
  .omat {
    margin-right: 2em;
    all: unset;
    cursor: pointer;
  }
  .login {
    margin-right: 1em;

    all: unset;
    cursor: pointer;
  }

  button:focus {
    background-color: #0e0604;
    color: #11c521;
  }
</style>
