import validateURL from "./validateURL";
import state from "../state/state";
import fetchRSS from "./fetchRss";
import parseXML from "./parseRSS";
import validateRss from "./validateRSS";
import {addNewRssInState, addReadPost, addReadPostInState} from "../state/updateState";
import {modalRender, updateFeedback, updateUI} from "../view/render";

const addRSS = (xmlDoc, message, rssLink) => {
    addNewRssInState(xmlDoc, rssLink);
    updateFeedback(message.type, message.message);
    document.getElementById('rss-input').value = '';
}

export const submitHandler = (rssLink) => {
    const feedbackMessage = {
        type: 'success',
        message: 'success.addRSS',
    }
    validateURL.validate({url: rssLink}, { context: {feeds: state.ui.rssLinksOrder} })
    .then(() => fetchRSS(rssLink))
    .then((xmlString) => {
        const xmlDoc = parseXML(xmlString);
        validateRss(xmlDoc);
        return xmlDoc;
    })
    .then((xmlDoc) => {
        addRSS(xmlDoc, feedbackMessage, rssLink);
    })
    .catch(error => {
        feedbackMessage.type = 'danger';
        feedbackMessage.message = error.message;
        updateFeedback(feedbackMessage.type, feedbackMessage.message);
    })
}

export const previewBtnHandler = (currentPostData) => {
    addReadPostInState(currentPostData);
    modalRender(currentPostData);
    updateUI(state);
}