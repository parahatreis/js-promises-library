const STATE = {
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
  PENDING: 'pending',
}

class MyPromise {
  #thenCbs = [];
  #catchCbs = [];
  #state = STATE.PENDING;
  #value;

  constructor(cb) {
    try {
      cb(this.#onSuccess, this.#onFail)
    } catch (error) {
      this.#onFail(error)
    }
  }

  // To run callbacks
  #runCallbacks() {
    // resolve
    if (this.#state === STATE.FULFILLED) {
      this.#thenCbs.forEach(callback => {
        callback(this.#value)
      })

      this.#thenCbs = [];
    };
    // reject 
    if (this.#state === STATE.REJECTED) {
      this.#catchCbs.forEach(callback => {
        callback(this.#value)
      })

      this.#catchCbs   = [];
    };
  }

  // Success method (resolve)
  #onSuccess(value) {
    if (this.#state !== STATE.PENDING) return;
    this.#value = value;
    this.#state = STATE.FULFILLED;
    console.log('onSuccess')
    this.#runCallbacks();
  }

  // Fail method (reject)
  #onFail(value) {
    if (this.#state !== STATE.PENDING) return;
    this.#value = value;
    this.#state = STATE.REJECTED;
    console.log('onFail')
    this.#runCallbacks();
  }

  // then method
  then(cb) {
    this.#thenCbs.push(cb);

    this.#runCallbacks();
  }
}

module.exports = MyPromise;

const p = new MyPromise((resolve, reject) => {
  resolve('hi');
  // reject('error');
});

p.then((data) => {
  console.log('My data', data);
})