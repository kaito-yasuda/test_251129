  import { useState } from 'react';
import { actions, formCard, input, primaryBtn, textarea } from './RegisterForm.styles';
import { type TaskType } from '../../types.ts';
type Props = {setTaskList:React.Dispatch<React.SetStateAction<TaskType[]>>}
//↑これ合っている？

export const RegisterForm = ({setTaskList}:Props) => {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');

  //配布コード（空欄の場合にできないようにする部分のコード）
  const isFormEmpty = !title.trim() || !detail.trim();
  //const isInvalidMessage = Boolean(errorMessage.title || errorMessage.detail);
  const isError = isFormEmpty // || isInvalidMessage;

  /**
   * TODO：新規登録の作成
   */
  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    // idは重複が許されない→数値化された新しい時間の値をidに入れるdate.now()を使用
    const newTask = {
    id: Date.now(),
    title: title,
    detail: detail,
    }
    //macのコンソールログ：Command+Opt+J
    console.log("newtask")
    //今までのデータ＋今書いたデータが追加できる
    setTaskList((prev)=>[...prev,newTask]);
    setTitle("");
    setDetail("");
    
    
  };

  return (
    <form style={formCard} onSubmit={(e) => onSubmitForm(e)}>
      <input style={input} type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='タイトルを入力'/>
      <br />
      <textarea style={textarea} value={detail} onChange={(e) => setDetail(e.target.value)} rows={7} placeholder='TODO を入力'></textarea>
      <div style={actions}>
        <button style={primaryBtn(true)} type='submit' disabled = {isError}>
          追加
        </button>
      </div>
    </form>
  );
};