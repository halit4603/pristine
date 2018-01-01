/*
------------------------

SYNCHRONOUS ACTION TYPES

------------------------
*/

export const SELECT_ACTIVE_ARTICLE = 'SELECT_ACTIVE_ARTICLE';
export const SELECT_ACTIVE_STREAM = 'SELECT_ACTIVE_STREAM';
export const CLEAR_STREAM = 'CLEAR_STREAM';
export const LOADING = 'LOADING';

/* 
------------------

ASYNC ACTION TYPES

------------------
*/

const asyncActionType = (type, bool) => ({
  success: `${type}_SUCCESS`,
  error: `${type}_ERROR`,
  load: bool
});

export const FETCH_SUBS = asyncActionType('FETCH_SUBS', true);
export const FETCH_STREAM = asyncActionType('FETCH_STREAM', true);
export const FETCH_CATEGORIES = asyncActionType('FETCH_CATEGORIES', true);
export const FETCH_COUNTS = asyncActionType('FETCH_COUNTS', true);
export const FETCH_MASTERMIX = asyncActionType('FETCH_MASTERMIX', true);
export const MARK_ARTICLE_READ = asyncActionType('MARK_ARTICLE_READ', false);
export const MISREAD_ARTICLE = asyncActionType('MISREAD_ARTICLE', true);
export const MARK_STREAM_READ = asyncActionType('MARK_STREAM_READ', false);
export const MARK_ALL_READ = asyncActionType('MARK_ALL_READ', false);
export const MARK_ARTICLE_UNREAD = asyncActionType('MARK_ARTICLE_UNREAD', false);

/*
--------------------------

ASYNC-RELATED HELPER TYPES

--------------------------
*/

export const APICALL = 'APICALL';
export const MISREAD_ARTICLE_SUCCESS = 'MISREAD_ARTICLE_SUCCESS';
export const MISREAD_ARTICLE_ERROR = 'MISREAD_ARTICLE_ERROR';
export const MISREAD_SUCCESS = 'MISREAD_SUCCESS';
export const FETCH_SUBS_SUCCESS = 'FETCH_SUBS_SUCCESS';
export const FETCH_STREAM_SUCCESS = 'FETCH_STREAM_SUCCESS';
export const FETCH_SUBS_ERROR = 'FETCH_SUBS_ERROR';
export const FETCH_STREAM_ERROR = 'FETCH_STREAM_ERROR';
export const FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_COUNTS_SUCCESS = 'FETCH_COUNTS_SUCCESS';
export const FETCH_COUNTS_ERROR = 'FETCH_COUNTS_ERROR';
export const FETCH_MASTERMIX_SUCCESS = 'FETCH_MASTERMIX_SUCCESS';
export const FETCH_MASTERMIX_ERROR = 'FETCH_MASTERMIX_ERROR';
export const MARK_ARTICLE_READ_SUCCESS = 'MARK_ARTICLE_READ_SUCCESS';
export const MARK_ARTICLE_READ_ERROR = 'MARK_ARTICLE_READ_ERROR';
