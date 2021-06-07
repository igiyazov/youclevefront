import httpClient from './httpClient'

const END_POINT = 'api/activity/subscription/profile';

const isSubscribe = (user_id) => httpClient.get(`${END_POINT}/${user_id}`);

export {
    isSubscribe
}