import validateURL from "./validateURL";
import state from "../state/state";
import fetchRSS from "./fetchRss";
import parseXML from "./parseRSS";
import throwIfInvalidRSS from "./validateRSS";
import {addNewRssInState} from "../state/updateState";
import {updateFeedback, updateUI} from "../view/render";

const addRSS = (xmlDoc, message, rssLink) => {
    addNewRssInState(xmlDoc, rssLink);
    updateFeedback(message.type, message.message);
    updateUI(state);
}

export const submitHandler = (rssLink) => {
    const feedbackMessage = {
        type: 'success',
        message: 'success.addRSS',
    }
    validateURL.validate({url: rssLink}, { context: {feeds: state.links} })
    .then(() => fetchRSS(rssLink))
    .then((xmlString) => {
        const xmlDoc = parseXML(xmlString);
        throwIfInvalidRSS(xmlDoc);
        console.log(xmlDoc);
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