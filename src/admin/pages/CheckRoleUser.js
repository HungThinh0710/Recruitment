import React, { Component } from 'react';

export default class CheckRoleUser {
  setUser = user => {
    window.name = user.id;
  };
}
