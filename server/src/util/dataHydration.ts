export const populateWithZeroValueDays = (startDate:Date, endDate:Date, data:any[], pack:(a:any | null, b:Date) => any):any[] => {
  const date = new Date(startDate.getTime())
  const out = []
  let currentIndex = 0

  do {
    //find record for this date
    const index = getNextDateRecordIndex(data, currentIndex, date)
    if (index >= 0) currentIndex = index
    
    const record = data[index]

    //package output
    out.push(pack(record, date))

    //increment date
    date.setDate(date.getDate() + 1)
  } while (date <= endDate)

  return out
}





const getNextDateRecordIndex = (data:any[], startIndex:number, date:Date):number => {
  const seekTime = date.getTime()

  for (let i = startIndex; i < data.length; i++) {
    const time = data[i].date.getTime()

    //if this is the record, return it's index
    if (time === seekTime) return i

    //if we're past the sought date, bail
    if (time > seekTime) break
  }

  return -1
}