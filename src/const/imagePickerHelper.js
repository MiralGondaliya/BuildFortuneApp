import * as ImagePicker from 'expo-image-picker';
import {Alert} from 'react-native';

export interface LocalImage {
  cancelled: boolean;
  height?: number;
  width?: number;
  uri?: string;
}

export class ImagePickerHelper {
  static async pickImage(
    onImageSelect: (imageData: LocalImage) => void,
    mediaTypes: ImagePicker.MediaTypeOptions = ImagePicker.MediaTypeOptions
      .Images,
    isRatioSquare = true,
  ): Promise<void> {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes,
        allowsEditing: true,
        aspect: isRatioSquare ? [4, 4] : undefined,
        quality: 0.5,
        videoExportPreset: 2,
        videoQuality: 1,
      });
      if (!result.cancelled) {
        onImageSelect(result);
      }
    }
  }
}
