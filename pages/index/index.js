Page({
  data: {
    time: 0,
    timeRemain: 0,
    minutes: "0:00",
    barHeight: 100
  },

  count: function () {
    // Set interval akan mengembalikan id

    this.intervalid = setInterval(() => {
      const newTime = this.data.timeRemain - 1;
      const percentage = Math.floor((this.data.timeRemain / this.data.time) * 100);

      this.convertMinutes(newTime);

      if (this.data.timeRemain >= 1) {
        this.setData({
          timeRemain: newTime,
          barHeight: percentage,
        })
      }

      this.vibe();
    }, 1000)

  },

  vibe: function () {
    if (this.data.timeRemain === 0) {
      my.vibrate()
      clearInterval(this.intervalid)
    }
  },

  onLoad: function () {
    // this.count();
  },

  onUnload: () => {
    clearInterval(this.intervalid)
  },

  setTimer: function (event) {
    /* 
     * there will be minutes and seconds
     */
    const {
      minutes,
      seconds
    } = event.detail.value;

    const time = ((Number(minutes) * 60) + Number(seconds));

    this.setData({
      time: time,
      timeRemain: time
    });


    this.convertMinutes(time);

    this.count()
  },

  convertMinutes: function (time) {
    // Hitung menit dan detik
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    // Format hasil agar selalu 2 digit untuk detik
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    this.setData({
      minutes: `${minutes} : ${formattedSeconds}`
    })
  }
});