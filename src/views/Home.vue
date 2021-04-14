<template>
  <h1 id="title">Brewery Finder</h1>

  <!-- SEARCH FIELD -->
  <input
    @keydown.enter="findBrewery"
    type="text"
    v-model="query"
    placeholder="Enter State"
  />
  <span class="button" @click.prevent="findBrewery">Find Brewery</span>

  <ul v-if="breweries.length > 0" id="brewery-list">
    <!-- HEADER -->
    <li class="header">
      <span class="name" @click="sort('name')">Name</span>
      <span @click="sort('brewery_type')">Type</span>
      <span @click="sort('street')">Address</span>
      <span @click="sort('city')">City</span>
    </li>

    <!-- BREWERY DATA -->
    <li class="brewery-item" :key="brewery.id" v-for="brewery in breweries">
      <span class="name"
        ><a :href="brewery.website_url">{{ brewery.name }}</a></span
      >
      <span>{{ brewery.brewery_type }}</span>
      <span class="street">{{ brewery.street }}</span>
      <span>{{ brewery.city }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Brewery, HeaderRow } from "@/types/index";
import "@/assets/reset.css";

let breweries: Brewery[] = [];

let unsortedHeader: HeaderRow = {
  name: false,
  brewery_type: false,
  street: false,
  city: false,
};

export default defineComponent({
  name: "Home",
  components: {},
  data: function () {
    return {
      breweries: breweries,
      query: "Colorado",
      sortedBy: "name",
      headerRow: unsortedHeader,
    };
  },
  methods: {
    findBrewery(): void {
      fetch(
        `https://api.openbrewerydb.org/breweries?per_page=50&by_state=${this.query}`
      )
        .then((response) => response.json())
        .then((data) => (this.breweries = data));
    },
    sort(key: string): void {
      if (this.headerRow[key] && this.sortedBy === key) {
        this.breweries.reverse();
        return;
      }
      this.breweries.sort((a: Brewery, b: Brewery) =>
        a[key] > b[key] ? 1 : -1
      );

      this.headerRow = unsortedHeader;
      this.sortedBy = key;
      this.headerRow[key] = true;
    },
  },
  mounted() {
    this.findBrewery();
    // Start sorted by name
    this.headerRow.name = true;
  },
});
</script>

<style scoped>
h1 {
  font-size: 2em;
  font-weight: bold;
  margin: 2em;
}

input[type="text"] {
  padding: 1em;
}

.button {
  background-color: blue;
  border-radius: 5px;
  color: white;
  margin: 1em;
  padding: 1em;
}

.header {
  font-weight: bold;
  cursor: pointer;
}

#brewery-list {
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 auto;
  margin: 5em;
  list-style: none;
}

#brewery-list li {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
}

#brewery-list li > span {
  border-bottom: 1px solid #d0d0d0;
  display: flex;
  flex-flow: row nowrap;
  flex-grow: 1;
  flex-basis: 0;
  min-width: 0px;
  overflow: hidden;
  padding: 0.5em;
  white-space: nowrap;
  word-break: break-word;
}

#brewery-list li > span.name {
  display: flex;
  flex-grow: 2;
}
</style>
