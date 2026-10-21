/** Hide the top-layer dialog before removing its held exit frame. */
export function finishDialogExit(
  dialog: Pick<HTMLDialogElement, "close">,
  animation: Pick<Animation, "cancel">,
  onClose: () => void,
) {
  dialog.close();
  animation.cancel();
  onClose();
}
