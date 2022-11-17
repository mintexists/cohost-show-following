// ==UserScript==
// @name        Show following state - cohost.org
// @namespace   Violentmonkey Scripts
// @match       https://cohost.org/*
// @exclude     https://cohost.org/rc/*
// @exclude     https://cohost.org/
// @exclude     https://cohost.org/*/*
// @grant       none
// @version     1.0
// @author      mint - mintexists.gay
// @description 11/17/2022, 2:48:53 PM
// ==/UserScript==

let cohostLoaderState = JSON.parse(document.getElementById('__COHOST_LOADER_STATE__').innerText)

document.addEventListener('readystatechange', event => {
  if (event.target.readyState != 'complete') return;
  if (cohostLoaderState["project-page-view"]) {
    let handle = cohostLoaderState["project-page-view"].pageHandle;

    fetch(`https://cohost.org/api/v1/project/${handle}/following`).then(r => r.json()).then(followStatus => {
        let followButton = document.querySelector('.justify-end').querySelector('button')
        if (followStatus.projectToReader == 2) {
          followButton.innerText += ' - following you'
          console.log('Updated follow button - following you')
        } else if (followStatus.projectToReader == 0 ) {
          followButton.innerText += ' - not following you'
          console.log('Updated follow button - not following you')
        }
    })
  }

})
