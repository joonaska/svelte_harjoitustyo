<script>
  // buttonissa slottiin voi laitella mitä vaan... ei taida olla lopullisesti kuin shuffle nappinna
  export let disabled = false;
</script>

<button {disabled} on:click><slot /></button>

<style>
  button {
    color: black;
    background-color: white;
    border: black solid 8px;
    border-radius: 5px;
    padding: 3em;
    font-size: x-large;
  }
  button:hover {
    background-color: black;
    color: white;
  }
</style>
