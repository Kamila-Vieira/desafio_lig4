class Play {
  constructor(row, col) {
    this.row = row
    this.col = col
  }

  hash() {
    return this.row.toString() + "," + this.col.toString()
  }
}

export default Play