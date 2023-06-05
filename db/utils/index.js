const formatErrors = (error, string = "reg") => {
  let errArr = [];
  if (string === "mongo") {
    // let headLine = [...Object.keys(error)];
    // for (let i = 0; i < headLine.length; i++) {
    //   errArr.push(error[headLine[i]]?.message);
    // }
    console.log("error:", error);
    return error;
    return errArr;
  } else {
    for (let i = 0; i < error.length; i++) {
      errArr.push(error[i]?.message.replace(/['"]+/g, ""));
    }
  }

  console.log("errArr:", errArr);
  return errArr;
};

module.exports.formatErrors = formatErrors;
