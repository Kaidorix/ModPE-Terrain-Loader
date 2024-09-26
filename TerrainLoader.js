var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var ExternStorage = android.os.Environment.getExternalStorageDirectory()+'/';
var File = java.io.File;
var FileReader = java.io.FileReader;
var BufferedReader = java.io.BufferedReader;
var FOS = java.io.FileOutputStream;
var String = java.lang.String;
var StringBuilder = java.lang.StringBuilder;
var MediaPlayer = android.media.MediaPlayer();
var h7f = {
	select: function(dir, fileName) {
		return (new File(dir, fileName));
	},
	exists: function(selectedFile) {
		return selectedFile.exists();
	},
	create: function(selectedFile) {
		selectedFile.createNewFile();
		return selectedFile;
	},
	del: function(selectedFile) {
		selectedFile.delete();
	},
	read: function(selectedFile) {
		var holo1 = (new BufferedReader(new FileReader(selectedFile)));
		var data = new StringBuilder();
		var string;
		while ((string = holo1.readLine()) != null) {
			data.append(string);
			data.append('\n');
		}
		return data.toString();
	},
	readLine: function(selectedFile, line) {
		var holo = new file.read(selectedFile);
		var lineArray = readT.split('\n');
		return lineArray[line - 1];
	},
	readKey: function(selectedFile, key, keySeparator) {
		var isText = 0;
		var i71 = new file.read(selectedFile);
		var splitTextR = textR.split('\n');
		for (var i = 0; i < splitTextR.length; i++) {
			var textRF = splitTextR[i].split(keySeparator);
			if (textRF[0] == key) {
				return textRF[1];
				isText = 1;
				break;
			}
			if (!isText) {
				return '[Unknown]';
			}
		}
	},
	write: function(selectedFile, text) {
		file.rewrite(selectedFile, (new file.read(selectedFile)) + text);
	},
	rewrite: function(selectedFile, text) {
		var writeFOS = new FOS(selectedFile);
		writeFOS.write(new String(text).getBytes());
	},
	writeKey: function(selectedFile, key, keyText, keySeparator) {
		var isText = 0;
		var h77r = new file.read(selectedFile);
		var splitTextR = textR.split(n);
		for (var i = 0; i < splitTextR.length; i++) {
			var textRF = splitTextR[i].split(keySeparator);
			if (textRF[0] == key) {
				var splitWithKey = textR.split(key + keySeparator + new file.readKey(selectedFile, key));
				file.rewrite(selectedFile, splitWithKey[0] + key + keySeparator + keyText + splitWithKey[1]);
				isText = 1;
				break;
			}
		}
		if (!isText) {
			file.write(selectedFile, key + keySeparator + keyText);
		}
	},
	mPlay: function(musicPath) {
		MediaPlayer.setDataSource(musicPath);
		MediaPlayer.prepare();
		MediaPlayer.start();
	},
	mStop: function() {
		MediaPlayer.reset();
	}
};

function Loader(TerrainFile) {
	var TerrainFileContent = h7f.read(new h7f.select(ExternStorage, TerrainFile + ".sd"));
	var TerrainLines = TerrainFileContent.split('\n');
	var TerrainData = [];
	for (var i = 0; i < TerrainLines.length; i++) {
	var lineValues = TerrainLines[i].split(' ');
		TerrainData.push(lineValues);
	}
	var TerrainLength = TerrainData.length
	for (var i = 0; i < TerrainLength; i++){
		
		setTile(parseInt(TerrainData[i][1]), parseInt(TerrainData[i][2]), parseInt(TerrainData[i][3]), parseInt(TerrainData[i][0]), 0);
	}
}
function chatHook(chat){
	if (chat.split(" ")[0] == ".load") {
		if (chat.split(" ")[1]) {
			Loader(chat.split(" ")[1]);
		} else {
			Loader("terrain");
		}
	}
}