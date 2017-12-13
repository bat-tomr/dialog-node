Set objArgs = WScript.Arguments
dialogType = objArgs(0)
dialogTitle = objArgs(1)
dialogText = objArgs(2)

If dialogType = "notification" Then
  MsgBox dialogText, 0, dialogTitle
ElseIf dialogType = "question" Then
  answer = MsgBox( dialogText, vbOKCancel, dialogTitle )
  Wscript.Stdout.Write answer
ElseIf dialogType = "entry" Then
  entryText = InputBox( dialogText, dialogTitle )
  Wscript.Stdout.Write entryText
Else
  WScript.Echo "unknown dialog type"
End If
