import validateURL from "./validateURL";
import state from "../state/state";
import fetchRSS from "./fetchRss";
import parseXML from "./parseRSS";
import throwIfInvalidRSS from "./validateRSS";
import {addNewRssInState} from "../state/updateState";
import {updateFeedback, updateUI} from "../view/render";

const addRSS = (xmlDoc, message, rssValue) => {
    addNewRssInState(xmlDoc, rssValue);
    updateFeedback(message.type, message.message);
    updateUI(state);
}

export const submitHandler = (rssValue) => {
    const message = {
        type: 'success',
        message: 'success.addRSS',
    }
    validateURL.validate({url: rssValue}, { context: {feeds: state.links} })
    .then(() => fetchRSS(rssValue))
    .then((xmlString) => {
        const xmlDoc = parseXML(xmlString);
        throwIfInvalidRSS(xmlDoc);
        console.log(xmlDoc);
        return xmlDoc;
    })
    .then((xmlDoc) => {
        addRSS(xmlDoc, message, rssValue);
    })
    .catch(error => {
        message.type = 'danger';
        message.message = error.message;
        updateFeedback(message.type, message.message);
    })
}