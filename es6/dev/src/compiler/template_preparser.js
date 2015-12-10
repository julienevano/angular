import { isBlank } from 'angular2/src/facade/lang';
const NG_CONTENT_SELECT_ATTR = 'select';
const NG_CONTENT_ELEMENT = 'ng-content';
const LINK_ELEMENT = 'link';
const LINK_STYLE_REL_ATTR = 'rel';
const LINK_STYLE_HREF_ATTR = 'href';
const LINK_STYLE_REL_VALUE = 'stylesheet';
const STYLE_ELEMENT = 'style';
const SCRIPT_ELEMENT = 'script';
const NG_NON_BINDABLE_ATTR = 'ngNonBindable';
export function preparseElement(ast) {
    var selectAttr = null;
    var hrefAttr = null;
    var relAttr = null;
    var nonBindable = false;
    ast.attrs.forEach(attr => {
        let lcAttrName = attr.name.toLowerCase();
        if (lcAttrName == NG_CONTENT_SELECT_ATTR) {
            selectAttr = attr.value;
        }
        else if (lcAttrName == LINK_STYLE_HREF_ATTR) {
            hrefAttr = attr.value;
        }
        else if (lcAttrName == LINK_STYLE_REL_ATTR) {
            relAttr = attr.value;
        }
        else if (attr.name == NG_NON_BINDABLE_ATTR) {
            nonBindable = true;
        }
    });
    selectAttr = normalizeNgContentSelect(selectAttr);
    var nodeName = ast.name.toLowerCase();
    var type = PreparsedElementType.OTHER;
    if (nodeName == NG_CONTENT_ELEMENT) {
        type = PreparsedElementType.NG_CONTENT;
    }
    else if (nodeName == STYLE_ELEMENT) {
        type = PreparsedElementType.STYLE;
    }
    else if (nodeName == SCRIPT_ELEMENT) {
        type = PreparsedElementType.SCRIPT;
    }
    else if (nodeName == LINK_ELEMENT && relAttr == LINK_STYLE_REL_VALUE) {
        type = PreparsedElementType.STYLESHEET;
    }
    return new PreparsedElement(type, selectAttr, hrefAttr, nonBindable);
}
export var PreparsedElementType;
(function (PreparsedElementType) {
    PreparsedElementType[PreparsedElementType["NG_CONTENT"] = 0] = "NG_CONTENT";
    PreparsedElementType[PreparsedElementType["STYLE"] = 1] = "STYLE";
    PreparsedElementType[PreparsedElementType["STYLESHEET"] = 2] = "STYLESHEET";
    PreparsedElementType[PreparsedElementType["SCRIPT"] = 3] = "SCRIPT";
    PreparsedElementType[PreparsedElementType["OTHER"] = 4] = "OTHER";
})(PreparsedElementType || (PreparsedElementType = {}));
export class PreparsedElement {
    constructor(type, selectAttr, hrefAttr, nonBindable) {
        this.type = type;
        this.selectAttr = selectAttr;
        this.hrefAttr = hrefAttr;
        this.nonBindable = nonBindable;
    }
}
function normalizeNgContentSelect(selectAttr) {
    if (isBlank(selectAttr) || selectAttr.length === 0) {
        return '*';
    }
    return selectAttr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVfcHJlcGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3RlbXBsYXRlX3ByZXBhcnNlci50cyJdLCJuYW1lcyI6WyJwcmVwYXJzZUVsZW1lbnQiLCJQcmVwYXJzZWRFbGVtZW50VHlwZSIsIlByZXBhcnNlZEVsZW1lbnQiLCJQcmVwYXJzZWRFbGVtZW50LmNvbnN0cnVjdG9yIiwibm9ybWFsaXplTmdDb250ZW50U2VsZWN0Il0sIm1hcHBpbmdzIjoiT0FDTyxFQUFDLE9BQU8sRUFBWSxNQUFNLDBCQUEwQjtBQUUzRCxNQUFNLHNCQUFzQixHQUFHLFFBQVEsQ0FBQztBQUN4QyxNQUFNLGtCQUFrQixHQUFHLFlBQVksQ0FBQztBQUN4QyxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUM7QUFDNUIsTUFBTSxtQkFBbUIsR0FBRyxLQUFLLENBQUM7QUFDbEMsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLENBQUM7QUFDcEMsTUFBTSxvQkFBb0IsR0FBRyxZQUFZLENBQUM7QUFDMUMsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDO0FBQzlCLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQztBQUNoQyxNQUFNLG9CQUFvQixHQUFHLGVBQWUsQ0FBQztBQUU3QyxnQ0FBZ0MsR0FBbUI7SUFDakRBLElBQUlBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBO0lBQ3RCQSxJQUFJQSxRQUFRQSxHQUFHQSxJQUFJQSxDQUFDQTtJQUNwQkEsSUFBSUEsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0E7SUFDbkJBLElBQUlBLFdBQVdBLEdBQUdBLEtBQUtBLENBQUNBO0lBQ3hCQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQTtRQUNwQkEsSUFBSUEsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7UUFDekNBLEVBQUVBLENBQUNBLENBQUNBLFVBQVVBLElBQUlBLHNCQUFzQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDekNBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO1FBQzFCQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxVQUFVQSxJQUFJQSxvQkFBb0JBLENBQUNBLENBQUNBLENBQUNBO1lBQzlDQSxRQUFRQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUN4QkEsQ0FBQ0E7UUFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsVUFBVUEsSUFBSUEsbUJBQW1CQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM3Q0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFDdkJBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLElBQUlBLG9CQUFvQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDN0NBLFdBQVdBLEdBQUdBLElBQUlBLENBQUNBO1FBQ3JCQSxDQUFDQTtJQUNIQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNIQSxVQUFVQSxHQUFHQSx3QkFBd0JBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO0lBQ2xEQSxJQUFJQSxRQUFRQSxHQUFHQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQTtJQUN0Q0EsSUFBSUEsSUFBSUEsR0FBR0Esb0JBQW9CQSxDQUFDQSxLQUFLQSxDQUFDQTtJQUN0Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsSUFBSUEsa0JBQWtCQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNuQ0EsSUFBSUEsR0FBR0Esb0JBQW9CQSxDQUFDQSxVQUFVQSxDQUFDQTtJQUN6Q0EsQ0FBQ0E7SUFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsSUFBSUEsYUFBYUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDckNBLElBQUlBLEdBQUdBLG9CQUFvQkEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7SUFDcENBLENBQUNBO0lBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLFFBQVFBLElBQUlBLGNBQWNBLENBQUNBLENBQUNBLENBQUNBO1FBQ3RDQSxJQUFJQSxHQUFHQSxvQkFBb0JBLENBQUNBLE1BQU1BLENBQUNBO0lBQ3JDQSxDQUFDQTtJQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxRQUFRQSxJQUFJQSxZQUFZQSxJQUFJQSxPQUFPQSxJQUFJQSxvQkFBb0JBLENBQUNBLENBQUNBLENBQUNBO1FBQ3ZFQSxJQUFJQSxHQUFHQSxvQkFBb0JBLENBQUNBLFVBQVVBLENBQUNBO0lBQ3pDQSxDQUFDQTtJQUNEQSxNQUFNQSxDQUFDQSxJQUFJQSxnQkFBZ0JBLENBQUNBLElBQUlBLEVBQUVBLFVBQVVBLEVBQUVBLFFBQVFBLEVBQUVBLFdBQVdBLENBQUNBLENBQUNBO0FBQ3ZFQSxDQUFDQTtBQUVELFdBQVksb0JBTVg7QUFORCxXQUFZLG9CQUFvQjtJQUM5QkMsMkVBQVVBLENBQUFBO0lBQ1ZBLGlFQUFLQSxDQUFBQTtJQUNMQSwyRUFBVUEsQ0FBQUE7SUFDVkEsbUVBQU1BLENBQUFBO0lBQ05BLGlFQUFLQSxDQUFBQTtBQUNQQSxDQUFDQSxFQU5XLG9CQUFvQixLQUFwQixvQkFBb0IsUUFNL0I7QUFFRDtJQUNFQyxZQUFtQkEsSUFBMEJBLEVBQVNBLFVBQWtCQSxFQUFTQSxRQUFnQkEsRUFDOUVBLFdBQW9CQTtRQURwQkMsU0FBSUEsR0FBSkEsSUFBSUEsQ0FBc0JBO1FBQVNBLGVBQVVBLEdBQVZBLFVBQVVBLENBQVFBO1FBQVNBLGFBQVFBLEdBQVJBLFFBQVFBLENBQVFBO1FBQzlFQSxnQkFBV0EsR0FBWEEsV0FBV0EsQ0FBU0E7SUFBR0EsQ0FBQ0E7QUFDN0NELENBQUNBO0FBR0Qsa0NBQWtDLFVBQWtCO0lBQ2xERSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxVQUFVQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNuREEsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7SUFDYkEsQ0FBQ0E7SUFDREEsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7QUFDcEJBLENBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtIdG1sRWxlbWVudEFzdH0gZnJvbSAnLi9odG1sX2FzdCc7XG5pbXBvcnQge2lzQmxhbmssIGlzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuY29uc3QgTkdfQ09OVEVOVF9TRUxFQ1RfQVRUUiA9ICdzZWxlY3QnO1xuY29uc3QgTkdfQ09OVEVOVF9FTEVNRU5UID0gJ25nLWNvbnRlbnQnO1xuY29uc3QgTElOS19FTEVNRU5UID0gJ2xpbmsnO1xuY29uc3QgTElOS19TVFlMRV9SRUxfQVRUUiA9ICdyZWwnO1xuY29uc3QgTElOS19TVFlMRV9IUkVGX0FUVFIgPSAnaHJlZic7XG5jb25zdCBMSU5LX1NUWUxFX1JFTF9WQUxVRSA9ICdzdHlsZXNoZWV0JztcbmNvbnN0IFNUWUxFX0VMRU1FTlQgPSAnc3R5bGUnO1xuY29uc3QgU0NSSVBUX0VMRU1FTlQgPSAnc2NyaXB0JztcbmNvbnN0IE5HX05PTl9CSU5EQUJMRV9BVFRSID0gJ25nTm9uQmluZGFibGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gcHJlcGFyc2VFbGVtZW50KGFzdDogSHRtbEVsZW1lbnRBc3QpOiBQcmVwYXJzZWRFbGVtZW50IHtcbiAgdmFyIHNlbGVjdEF0dHIgPSBudWxsO1xuICB2YXIgaHJlZkF0dHIgPSBudWxsO1xuICB2YXIgcmVsQXR0ciA9IG51bGw7XG4gIHZhciBub25CaW5kYWJsZSA9IGZhbHNlO1xuICBhc3QuYXR0cnMuZm9yRWFjaChhdHRyID0+IHtcbiAgICBsZXQgbGNBdHRyTmFtZSA9IGF0dHIubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChsY0F0dHJOYW1lID09IE5HX0NPTlRFTlRfU0VMRUNUX0FUVFIpIHtcbiAgICAgIHNlbGVjdEF0dHIgPSBhdHRyLnZhbHVlO1xuICAgIH0gZWxzZSBpZiAobGNBdHRyTmFtZSA9PSBMSU5LX1NUWUxFX0hSRUZfQVRUUikge1xuICAgICAgaHJlZkF0dHIgPSBhdHRyLnZhbHVlO1xuICAgIH0gZWxzZSBpZiAobGNBdHRyTmFtZSA9PSBMSU5LX1NUWUxFX1JFTF9BVFRSKSB7XG4gICAgICByZWxBdHRyID0gYXR0ci52YWx1ZTtcbiAgICB9IGVsc2UgaWYgKGF0dHIubmFtZSA9PSBOR19OT05fQklOREFCTEVfQVRUUikge1xuICAgICAgbm9uQmluZGFibGUgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIHNlbGVjdEF0dHIgPSBub3JtYWxpemVOZ0NvbnRlbnRTZWxlY3Qoc2VsZWN0QXR0cik7XG4gIHZhciBub2RlTmFtZSA9IGFzdC5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gIHZhciB0eXBlID0gUHJlcGFyc2VkRWxlbWVudFR5cGUuT1RIRVI7XG4gIGlmIChub2RlTmFtZSA9PSBOR19DT05URU5UX0VMRU1FTlQpIHtcbiAgICB0eXBlID0gUHJlcGFyc2VkRWxlbWVudFR5cGUuTkdfQ09OVEVOVDtcbiAgfSBlbHNlIGlmIChub2RlTmFtZSA9PSBTVFlMRV9FTEVNRU5UKSB7XG4gICAgdHlwZSA9IFByZXBhcnNlZEVsZW1lbnRUeXBlLlNUWUxFO1xuICB9IGVsc2UgaWYgKG5vZGVOYW1lID09IFNDUklQVF9FTEVNRU5UKSB7XG4gICAgdHlwZSA9IFByZXBhcnNlZEVsZW1lbnRUeXBlLlNDUklQVDtcbiAgfSBlbHNlIGlmIChub2RlTmFtZSA9PSBMSU5LX0VMRU1FTlQgJiYgcmVsQXR0ciA9PSBMSU5LX1NUWUxFX1JFTF9WQUxVRSkge1xuICAgIHR5cGUgPSBQcmVwYXJzZWRFbGVtZW50VHlwZS5TVFlMRVNIRUVUO1xuICB9XG4gIHJldHVybiBuZXcgUHJlcGFyc2VkRWxlbWVudCh0eXBlLCBzZWxlY3RBdHRyLCBocmVmQXR0ciwgbm9uQmluZGFibGUpO1xufVxuXG5leHBvcnQgZW51bSBQcmVwYXJzZWRFbGVtZW50VHlwZSB7XG4gIE5HX0NPTlRFTlQsXG4gIFNUWUxFLFxuICBTVFlMRVNIRUVULFxuICBTQ1JJUFQsXG4gIE9USEVSXG59XG5cbmV4cG9ydCBjbGFzcyBQcmVwYXJzZWRFbGVtZW50IHtcbiAgY29uc3RydWN0b3IocHVibGljIHR5cGU6IFByZXBhcnNlZEVsZW1lbnRUeXBlLCBwdWJsaWMgc2VsZWN0QXR0cjogc3RyaW5nLCBwdWJsaWMgaHJlZkF0dHI6IHN0cmluZyxcbiAgICAgICAgICAgICAgcHVibGljIG5vbkJpbmRhYmxlOiBib29sZWFuKSB7fVxufVxuXG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZU5nQ29udGVudFNlbGVjdChzZWxlY3RBdHRyOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoaXNCbGFuayhzZWxlY3RBdHRyKSB8fCBzZWxlY3RBdHRyLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAnKic7XG4gIH1cbiAgcmV0dXJuIHNlbGVjdEF0dHI7XG59XG4iXX0=