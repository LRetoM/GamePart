import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

console.log('[GamePart] MINIMAL-TEST: Bundle geladen');

export default class GamePartWebPart extends BaseClientSideWebPart<Record<string, never>> {
  public render(): void {
    console.log('[GamePart] MINIMAL-TEST: render');
    this.domElement.innerHTML = '<h2 style="color:green">GamePart MINIMAL-TEST funktioniert</h2>';
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
