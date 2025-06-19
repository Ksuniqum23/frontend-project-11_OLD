import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {initListeners} from './view/listeners.js';
import state from './state/state.js';
import onChange from "on-change";
import {updateUI} from "./view/render";
import {checkUpdates} from "./controller/checkUpdates";


export const watchedState = onChange(state, (path, value) => {
    updateUI(watchedState);
});

document.addEventListener('DOMContentLoaded', () => {
    initListeners();
    checkUpdates(); // Первый запуск сразу после инициализации
});