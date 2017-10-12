import Vue from 'vue';
import './style.scss';

import VueResource from 'vue-resource';
Vue.use(VueResource); // adds $http method to Vue instace, can be used as this.$http

import moment from 'moment-timezone';
moment.tz.setDefault("UTC"); // add side component with its methods to the Vue so they are available to all components inside app instance
Object.defineProperty(Vue.prototype, '$moment', { get() {return this.$root.moment} });

import { checkFilter, setDay } from './util/bus'; // object in outer scope available to all app. Applied as checkFilter, not this.checkFilter
const bus = new Vue(); // create bus event instance. make bus const visible fo all components
Object.defineProperty(Vue.prototype, '$bus', { get() {return this.$root.bus} });

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import routes from './util/routs';
const router = new VueRouter({ routes });

import Tooltip from './util/Tooltip';
Vue.use(Tooltip);

new Vue({
	el: '#app',
	data: {
		genre: [],
		time:[],
		movies:[],
		moment,
		day: moment(),
		bus
	},
	created() {
		this.$http.get('/api').then(response => {
			this.movies = response.data;
		});
		this.$bus.$on('check-filter', checkFilter.bind(this));
		this.$bus.$on('set-day', setDay.bind(this));
	},
	router

});
