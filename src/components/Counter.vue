<template>
  <h2>Counter</h2>
  <p> {{ counter }} <sup> 2 </sup> = {{ squareCounter }} </p>

  <div>
    <button @click="increase">+1</button> <!-- @ == v-on -->
    <button @click="decrease">-1</button>
  </div>
</template>

<script>
export default {
  // name: 'Counter',
  data() {
    return {
      counter: 5
    }
  },
  methods: {
    getSquareValue() {
      return this.counter * this.counter
    },
    increase() {
      this.counter++
    },
    decrease() {
      this.counter--
    }
  },
  computed: {
    squareCounter() {
      return this.counter * this.counter
    }
  }
}
</script>

<style>
  button{
    background-color: #64BB87;
    border-radius: 5px;
    border: 1px solid white;
    color: white;
    cursor: pointer;
    margin: 0 5px;
    padding: 5px 15px;
    transition: 0.3s ease-in-out;
  }

  button:hover { 
    background-color: #5aa67b;
    transition: 0.3 ease-in-out;
  }
</style>