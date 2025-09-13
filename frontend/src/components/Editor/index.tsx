import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/mode-rust';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-kotlin';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-php';
import 'ace-builds/src-noconflict/mode-lua';
import 'ace-builds/src-noconflict/mode-text';

import 'ace-builds/src-noconflict/theme-tomorrow_night';

import Text from '../Text';
import { useState, type ChangeEvent } from 'react';

const MAX_CODE_LENGTH = 1000;

type EditorProps = {
  onCodeChange: (code: string) => void;
};

export const supportedLanguages = [
  'text',
  'typescript',
  'javascript',
  'golang',
  'rust',
  'python',
  'java',
  'kotlin',
  'csharp',
  'html',
  'c_cpp',
  'ruby',
  'php',
  'lua',
] as const;

const Editor = ({ onCodeChange }: EditorProps) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<(typeof supportedLanguages)[number]>(
    supportedLanguages[1]
  );

  const handleCodeChange = (val: string) => {
    setCode(val);
    onCodeChange(val);
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as (typeof supportedLanguages)[number]);
  };

  const exceedCharacterLength = code.length > MAX_CODE_LENGTH;

  return (
    <div className="flex flex-col gap-y-1">
      <div className="w-full rounded-lg overflow-hidden border border-gray-700 bg-gray-800">
        <div className="box-border p-3 border-b border-gray-700 flex items-center justify-between">
          <div className="flex gap-x-2 items-center">
            <Text
              color="cyan"
              size="md"
              className="font-sans translate-y-[-1px]"
            >{`‹ ›`}</Text>
            <Text color="textDefault" size="sm">
              Code Editor
            </Text>
          </div>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="capitalize text-sm bg-gray-700 py-1 px-2 rounded text-gray-300"
          >
            {supportedLanguages.map((language) => (
              <option value={language}>{language}</option>
            ))}
          </select>
        </div>
        <AceEditor
          width="100%"
          height="350px"
          placeholder="Write or paste code here…"
          mode={language}
          theme="tomorrow_night"
          onChange={handleCodeChange}
          name="editor"
          editorProps={{ $blockScrolling: true }}
        />
      </div>
      <div className="flex justify-end">
        <Text color={exceedCharacterLength ? 'red' : 'gray'} size="xs">
          {code.length}/1000
        </Text>
      </div>
    </div>
  );
};

export default Editor;
