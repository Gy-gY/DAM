import en from './en';
import zh from './zh';
export default function SelectLanguage(type) {
  if(type=='zh') {
    return zh;
  }else if(type=='en') {
    return en;
  }else{
    return zh;
  }
}
