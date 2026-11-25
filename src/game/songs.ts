// リズムゲームの収録曲リスト（作品データ。ここは作品ごとに書き換える場所で、
// エンジン側の部品ではない。CD 側の作品データが src/album/ にあるのと同じ考え方）。
//
// 1曲ごとに決めるもの:
// - id: 曲 ID（半角英数の短い名前。譜面・歌詞データのキーになる。公開後に変えない）
// - audioUrl / jacketUrl: 音源とジャケット。音源は制作入口で用意した唯一の
//   正規音源 MP3 192kbps（src/game/assets/track0N.mp3。CD 側プレイヤーも
//   同じ音源を src/album/assets/audio/track0N.mp3 として参照し、ビルドでは
//   内容が同一のため dist 上は1ファイルにまとまる）、ジャケットは
//   CD 側の曲ジャケット（1024×1024）のコピー。作り方は docs/PRODUCTION.md の
//   「リズムゲーム（任意モジュール）」参照
// - frameInset: ジャケット絵の四辺に焼き込まれた紙枠の幅（実画像ピクセル、絵は
//   1024×1024）。演奏画面の背景では、この枠を除いた内側の絵だけを敷く。
//   枠が無い絵は 0
// - slidePosition: メニューのカルーセルでジャケットを寄せる位置（CSS の
//   object-position）。絵の中の曲タイトルができるだけ収まる側へ寄せる。
//   未指定なら中央
// - accent: 曲のテーマ色（#rrggbb）。メニューの枠・光・ボタンなどのアクセント色
//   として、選曲に合わせて切り替わる（オーナー決定 2026-11-20 のパターン3）。
//   ジャケットから scripts/jacket-accent.py で抜き出す（視認性のために明度・
//   彩度を持ち上げる処理込み）
// - bonus: ボーナストラックなら true（CD 側 tracks.ts の bonus と一致させる）。
//   スライドの先頭に金色の BONUS チップが出る
// - album: 収録アルバム名（表示用） / genre: ジャンル（表示用）
//
// 譜面（data/charts.json）と歌詞（data/lyrics.json）は生成物なので、ここには
// 書かない。生成手順は docs/PRODUCTION.md 参照。
import track01Audio from './assets/track01.mp3';
import track01Jacket from './assets/track01.jpg';
import track02Audio from './assets/track02.mp3';
import track02Jacket from './assets/track02.jpg';
import track03Audio from './assets/track03.mp3';
import track03Jacket from './assets/track03.jpg';

export interface GameSongDef {
  id: string;
  audioUrl: string;
  jacketUrl: string;
  frameInset: number;
  slidePosition?: string;
  accent: string;
  bonus?: boolean;
  album: string;
  genre: string;
}

// NK-S008 の収録曲。frameInset は 2026-11-25 に目視＋実測（暖色の紙色テストと
// 無彩色の白枠テストの両方、四辺）で決定:
// - yokohama（track01）: 白いマット枠（無彩色テストで帯がほぼ1.0のまま続き境界で
//   急落。左90／右85／上92／下92px）。四辺最大の 92 を採用。CD 制作時に裏面用に
//   実測した内側切り出し（90,92,939,932）とも一致する
// - michishio（track02）: 全面絵で枠なし（両テストとも帯なし）→ 0
// - sayonara（track03）: 霧の絵柄で明るい部分はだらだら変化し帯状にならない
//   （絵柄側）→ 0
// accent は scripts/jacket-accent.py の抽出値。
export const SONG_DEFS: GameSongDef[] = [
  {
    id: 'yokohama',
    audioUrl: track01Audio,
    jacketUrl: track01Jacket,
    frameInset: 92,
    accent: '#5183d6',
    album: 'NK-S008 夜の果ての横浜',
    genre: 'Melodic Trap / Neo-Noir R&B',
  },
  {
    id: 'michishio',
    audioUrl: track02Audio,
    jacketUrl: track02Jacket,
    frameInset: 0,
    accent: '#5190d6',
    album: 'NK-S008 夜の果ての横浜',
    genre: 'Japanese R&B',
  },
  {
    id: 'sayonara',
    audioUrl: track03Audio,
    jacketUrl: track03Jacket,
    frameInset: 0,
    bonus: true,
    accent: '#5170d6',
    album: 'NK-S008 夜の果ての横浜',
    genre: 'Enka',
  },
];
