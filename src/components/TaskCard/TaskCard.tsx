import { useState } from 'react';
import type { TaskType } from '../../types';
//import { setTitle } from '../RegisterForm/RegisterForm.tsx';
import * as S from './TaskCard.styles';

type Props = {
  task: TaskType;
  taskList: TaskType[];
  setTaskList:React.Dispatch<React.SetStateAction<TaskType[]>>;

};

export const TaskCard = ({ task, taskList, setTaskList
 }: Props) => {
  const { title, detail } = task;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDetail, setEditedDetail] = useState(detail);

  //確認用
  //console.log(taskList)

  // 編集ボタン押下時の処理
  const onClickEditButton = () => {
    setIsEditing((prev) => !prev);
    console.log(task.id);
  };

  // キャンセルボタン押下時の処理
  const onClickCancelButton = () => {
    setEditedTitle(title);
    setEditedDetail(detail);
    setIsEditing(false);
  };

  /**
   * TODO：削除の作成
   */
  const onClickDeleteButton = () => {
    // ここに削除ボタン押下時の処理
  };

  // TODO：編集の作成
  const onSubmitEditForm = (e: React.FormEvent) => {
    e.preventDefault();
    // ここに更新ボタン押下時の処理
    // すでに切り替わりはできている　isediting:編集中か否か（初期値はfalse）
    //editedTitle, setEditedTitle / editedDetail, setEditedDetail を使うのがポイント

    //map:特定のとこだけ変更して更新。他（id）を今回は触らずやりたいので使う
    const updatedTaskList = taskList.map((t) => {
      if (t.id === task.id) {
        return {
          id: t.id,
          title: editedTitle,
          detail: editedDetail
        };
      }
      return t;
    })
    //...:分割代入　参照による値の崩れ対策として新しい数列を作るための動作
    setTaskList([...updatedTaskList]);
    //...:分割代入　参照による値の崩れ対策として新しい数列を作るための動作
    setIsEditing((prev) => !prev)
    };

  //カード全体のあれをpropsで撮ってくる必要がある
  //!!taskcard（ここの上の方）に書くsetTaskCardのなにか消してしまった気がする
  //<TaskCard key={task.id} task={task} taskList = {taskList} />　←これっぽいやつ
  //考え方：一通り探索してidと照合するものを探す→一致したらリストから取り出す→settaskcardを利用して書き換える
  //リストからidを使用して探索する作業をやります
  //setTaskList((taskList)=>[updatedTaskList]);?

  return (
    <>
      {isEditing ? (
        //trueだと↓ここが　更新時に発火されるなにかがどうって言っていた
        <form style={S.card} onSubmit={onSubmitEditForm}>
          <input style={S.editInput} value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
          <br />
          <textarea
            style={S.editTextarea}
            value={editedDetail}
            onChange={(e) => setEditedDetail(e.target.value)}
            rows={7}
          />
          <br />
          <div style={S.editActions}>
            <button style={S.primaryBtn(true)} type='submit'>
              更新
            </button>
            <button style={S.pillBtn} onClick={onClickCancelButton} type='button'>
              キャンセル
            </button>
          </div>
        </form>
        //falseだと↓ここが表示されている
      ) : (
        <div style={S.card}>
          <h3 style={S.title}>{title}</h3>
          <p style={S.detail}>{detail}</p>
          <div style={S.viewActions}>
            <button style={S.pillBtn} onClick={onClickEditButton}>
              編集
            </button>
            <button style={S.dangerBtn} onClick={onClickDeleteButton} hidden={isEditing}>
              削除
            </button>
          </div>
        </div>
      )}
    </>
  );
};
