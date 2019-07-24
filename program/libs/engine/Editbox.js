!function() {
    function e(e) {
        switch (e) {
          case n.DEFAULT:
          case n.DONE:
            return "done";

          case n.SEND:
            return "send";

          case n.SEARCH:
            return "search";

          case n.GO:
            return "go";

          case n.NEXT:
            return "next";
        }
        return "done";
    }
    function t(e) {
        var t = e._placeholderLabel, n = e._textLabel, i = e._impl._text;
        t.node.active = "" === i, n.node.active = "" !== i;
    }
    if (cc && cc.EditBox) {
        var n = cc.EditBox.KeyboardReturnType, i = cc.EditBox._EditBoxImpl.prototype, d = null;
        cc.EditBox.prototype.editBoxEditingDidBegan = function() {
            cc.Component.EventHandler.emitEvents(this.editingDidBegan, this), this.node.emit("editing-did-began", this);
        }, cc.EditBox.prototype.editBoxEditingDidEnded = function() {
            cc.Component.EventHandler.emitEvents(this.editingDidEnded, this), this.node.emit("editing-did-ended", this);
        }, cc.EditBox.prototype._updateStayOnTop = function() {}, i.setFocus = function() {
            this._beginEditing();
        }, i.isFocused = function() {
            return this._editing;
        }, i.setInputMode = function(e) {
            this._inputMode = e;
        }, i._beginEditing = function() {
            this.createInput();
        }, i._endEditing = function() {
            this._delegate && this._delegate.editBoxEditingDidEnded(), this._editing = !1;
        }, i.createInput = function() {
            function n(e) {
                c._text = e.value, c._delegate && c._delegate.editBoxEditingReturn && c._delegate.editBoxEditingReturn(), 
                wx.hideKeyboard({
                    success: function(e) {},
                    fail: function(e) {
                        cc.warn(e.errMsg);
                    }
                });
            }
            function i(e) {
                e.value.length > c._maxLength && (e.value = e.value.slice(0, c._maxLength)), c._delegate && c._delegate.editBoxTextChanged && c._text !== e.value && (c._text = e.value, 
                c._delegate.editBoxTextChanged(c._text), t(c._delegate));
            }
            function o() {
                c._endEditing(), wx.offKeyboardConfirm(n), wx.offKeyboardInput(i), wx.offKeyboardComplete(o), 
                d = null;
            }
            d !== this && (d && (d._endEditing(), wx.offKeyboardConfirm(d.onKeyboardConfirmCallback), 
            wx.offKeyboardInput(d.onKeyboardInputCallback), wx.offKeyboardComplete(d.onKeyboardCompleteCallback)), 
            d = this);
            var a = this._inputMode === cc.EditBox.InputMode.ANY, c = this;
            this._editing = !0, wx.showKeyboard({
                defaultValue: c._text,
                maxLength: c._maxLength,
                multiple: a,
                confirmHold: !1,
                confirmType: e(c._returnType),
                success: function(e) {
                    c._delegate && c._delegate.editBoxEditingDidBegan && c._delegate.editBoxEditingDidBegan();
                },
                fail: function(e) {
                    cc.warn(e.errMsg), c._endEditing();
                }
            }), wx.onKeyboardConfirm(n), wx.onKeyboardInput(i), wx.onKeyboardComplete(o);
        };
    }
}();