  import { useState } from 'react';
import { actions, formCard, input, primaryBtn, textarea } from './RegisterForm.styles';
import { type TaskType } from '../../types.ts';
type Props = {setTaskList:React.Dispatch<React.SetStateAction<TaskType[]>>}
//↑これ合っている？

export const RegisterForm = ({setTaskList}:Props) => {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');

  /**
   * TODO：新規登録の作成
   */
  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    //「タイトル」・「TODO」を入力後、追加ボタン押下でタスクカードを追加 taskList,setTaskListを書き換える
    //「タイトル」・「TODO」のいずれかが空欄の場合には登録できないようにする
    // idは重複が許されない→数値化された新しい時間の値をidに入れるdate.now()を使用

    const newTask = {
    id: Date.now(),
    title: title,
    detail: detail,
    }
    //macのコンソールログ：Cmd+Opt+J
    console.log("newtask")
    //今までのデータ＋今書いたデータが追加できる
    setTaskList((prev)=>[...prev,newTask]);
  };

  return (
    <form style={formCard} onSubmit={(e) => onSubmitForm(e)}>
      <input style={input} type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='タイトルを入力a'/>
      <br />
      <textarea style={textarea} value={detail} onChange={(e) => setDetail(e.target.value)} rows={7} placeholder='TODO を入力'></textarea>
      <div style={actions}>
        <button style={primaryBtn(true)} type='submit'>
          追加
        </button>
      </div>
    </form>
  );
};
