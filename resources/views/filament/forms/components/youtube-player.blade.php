<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field">

    @if ($get('link'))
    <iframe
        width="100%"
        height="240px"
        src="https://www.youtube.com/embed/{{ $get('link') }}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen></iframe>
    @else
    <div style="
    display: flex;
    align-items: center;
    justify-content: center;
    height: 240px;
    border-radius: 6px;
    border: 1px dashed #e5e7eb;
    background-color: #ffffff03;
    color: #9ca3af;
    font-size: 13px;
">
        <span>No video preview yet</span>
    </div>



    @endif

</x-dynamic-component>