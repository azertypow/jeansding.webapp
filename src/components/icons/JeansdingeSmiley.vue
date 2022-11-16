<template>
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
       y="0px"
       viewBox="0 0 160 160" style="enable-background:new 0 0 160 160;" xml:space="preserve">
    <g>
	<defs>
		<rect id="SVGID_1_" x="1.5" y="1.5" width="157" height="157"/>
	</defs>
      <clipPath id="SVGID_00000052099056192275748040000017561921626861569714_">
		<use xlink:href="#SVGID_1_" style="overflow:visible;"/>
	</clipPath>

      <circle
          style="clip-path:url(#SVGID_00000052099056192275748040000017561921626861569714_);fill:none;stroke:var(--jd-color--varriable);stroke-width:6;"
          cx="80" cy="80" r="75.5"/>
</g>
</svg>
</template>
<style lang="scss" scoped>
svg {
  display: block;
  width: 100%;
  height: auto;
  padding: .5rem;
  box-sizing: border-box;
  transition: transform 500ms ease-in-out;
  transform: rotateZ(-20deg);

  .is-projects & {
    transform: rotateZ(20deg);
  }
}
</style>
