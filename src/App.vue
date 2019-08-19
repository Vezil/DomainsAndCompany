<template>
  <div id="app">
    <h2>Vue Autocomplete</h2>
    <switch-theme />
  <div v-if="selected">
        <img :src="selected.logo" alt="Logo"/>
        <ul>
            <li> Name: {{selected.name}} </li>
            <li> Domain: {{selected.domain}} </li>
        </ul>
  </div>
  <br>
  <p>
      Loading: <b>{{ loading }}</b>
  </p>

    <cool-select v-model="selected" :items="items" :loading="loading" item-text="name"
    placeholder="Enter company name" disable-filtering-by-search @search="onSearch">
      <template slot="no-data"> {{noData ? "No information found by request." : "We need at least 2 letters to search."}}
      </template>
      <template slot="item" slot-scope="{ item }">
          <div style="display:flex; slign-items:center;">
            <img :src="item.logo" class="logo" />
            <div>
              <span class="item-name"> {{item.name}} </span> <br>
              <span class="item-domain"> {{item.domain}} </span>
            </div>
           </div>
       </template>
      </cool-select>
    </div>
</template>
<script>
  import { CoolSelect } from 'vue-cool-select'
  import SwitchTheme from './components/SwitchTheme.vue'
 
  export default {
    name:'App',
    components: {
        CoolSelect,
        SwitchTheme
      
    },
    data() {
      return {
            selected: null,
            items: [],
            loading: false,
            timeoutId: null,
            noData:false
      }
    },

    methods: { 
        async onSearch(search) {
          const lettersLimit = 2;
          this.noData = false;
          if(search.length<lettersLimit) {
            this.items = [];
            this.loading = false;
            return;
          }
          this.loading = true;
          clearTimeout(this.timeoutId);
          this.timeoutId = setTimeout(async () => {
            const response = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query="${search}"`);
          
          this.items = await response.json();
          this.loading = false;
          if(!this.items.length) this.noData = true;
          console.log(this.items);
        }, 500);
    }
  }
}
</script>

<style lang="scss" scoped>
.item-name {
  font-size: 25px;
}

.item-domain {
  color: gray;
}

.logo {
  max-width: 60px;
  margin-right: 10px;
  border: 1px solid #eaecf0;
}

#app {
  height: 100vh;
}

#app > div {
  width: 45vw;
}


</style>
























