/**
 * getStandardFile() - ф-я для получения модели файла(ов), ожидаемые сервером
 * @files - лист файлов, полученные из event input File
 * */
export async function getStandardFile(files) {
  const filesList = Array.from(files);
  const filesStandardList = [];

  for (const file of filesList) {
    let filesStandard;
    if (file) {
      filesStandard = {
        name: file.name,
        size: file.size,
        mime: file.type,
        content: await convertBase64(file),
        hash: "",
        type: "",
      };
    }

    filesStandardList.push(filesStandard);
  }

  return filesStandardList;
}

function convertBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}
