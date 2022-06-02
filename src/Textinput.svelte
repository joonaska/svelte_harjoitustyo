<script>
  // tunneilla tehtty textInput

  export let type = 'text';
  export let id;
  export let value;
  export let label;
  export let cols = 30;
  export let rows = 10;
  export let maxlength = 10;
  export let minlength = 5;
  export let errmsg;
  export let valid;

  let firstVisit = true;

  const changeValue = (event) => {
    value = event.target.value;
  };
</script>

{#if type === 'textarea'}
  <div>
    <label for={id}>{label}</label>
    <textarea
      {value}
      {id}
      on:input={changeValue}
      {cols}
      {rows}
      on:blur={() => (firstVisit = false)}
      class:inputerror={errmsg && !valid && !firstVisit}
    />
    {#if errmsg && !valid && !firstVisit}
      <p class="error">{errmsg}</p>
    {/if}
  </div>
{:else}
  <div>
    <label for={id}>{label}</label>
    <input
      {type}
      {value}
      {id}
      on:input={changeValue}
      {maxlength}
      {minlength}
      on:blur={() => (firstVisit = false)}
      class:inputerror={errmsg && !valid && !firstVisit}
    />
    {#if errmsg && !valid && !firstVisit}
      <p class="error">{errmsg}</p>
    {/if}
  </div>
{/if}

<style>
  label {
    text-align: left;
    border-bottom: 1px solid black;
    margin-bottom: 0, 5em;
  }
  input {
    background: linear-gradient(
      to right,
      #272727 0%,
      #1d1d1d 50%,
      #000000 100%
    );
    color: white;
    border-radius: 0.5em;
    width: 100%;
  }
  div {
    border-left: 1px solid #eee;
  }
  textarea {
    background-color: #eee;
    border-radius: 0.5em;
    width: auto;
  }
  .error {
    font-size: 0.75em;
    color: rgb(250, 2, 2);
    text-align: left;
    margin: 0;
  }
  .inputerror {
    border: 1px solid rgb(250, 2, 2);
  }
  label {
    color: white;
  }
</style>
