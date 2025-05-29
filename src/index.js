import 'bootstrap/dist/css/bootstrap.min.css';
import initListeners from './view/listeners.js';
import initialState from './state/state.js';
import onChange from "on-change";
import {updateUI} from "./view/render";
import {checkUpdates} from "./controller/checkUpdates";

export const watchedState = onChange(initialState, (path, value) => {
    console.log('state изменился: ', path, ' - ', value, '');
    updateUI(watchedState);
});

document.addEventListener('DOMContentLoaded', () => {
    initListeners();
    checkUpdates(); // Первый запуск сразу после инициализации
});